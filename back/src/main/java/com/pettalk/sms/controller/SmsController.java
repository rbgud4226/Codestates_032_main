package com.pettalk.sms.controller;

import com.pettalk.member.entity.Member;
import com.pettalk.member.repository.MemberRepository;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.Duration;
import java.util.Random;


@RestController
public class SmsController {

    final DefaultMessageService messageService;
    private MemberRepository memberRepository;
    private RedisTemplate<String, Object> redisTemplate;

    public SmsController( MemberRepository memberRepository, RedisTemplate<String, Object> redisTemplate) {
        this.messageService = NurigoApp.INSTANCE.initialize("", "", "https://api.coolsms.co.kr");
        this.memberRepository =memberRepository;
        this.redisTemplate =redisTemplate;
    }

    @PostMapping("/send-message")
    public SingleMessageSentResponse sendAuthMessageToMember(@RequestParam String email) {
        // Redis에서 이메일로 회원 정보를 찾음
        Member cachedMember = (Member) redisTemplate.opsForValue().get(email);

        if (cachedMember != null) {
            String to = cachedMember.getPhone();
            String authCode = generateRandomAuthCode();

            Message message = new Message();
            message.setFrom("01029776228");
            message.setTo(to);
            message.setText("인증 코드: " + authCode);

            SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
            System.out.println(response);


            cachedMember.setAuthCode(authCode);
            redisTemplate.opsForValue().set(email, cachedMember, Duration.ofMinutes(10));

            return response;
        } else {
            throw new IllegalArgumentException("회원정보를 찾을 수 없습니다");
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> completeRegistration(@RequestParam String authCode, @RequestParam String email) {
        Member cachedMember = (Member) redisTemplate.opsForValue().get(email);

        if (cachedMember != null) {
            if (authCode.equals(cachedMember.getAuthCode())) {


                memberRepository.save(cachedMember);
                return new ResponseEntity<>("핸드폰 인증 완료, 회원가입 완료되었습니다", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("인증코드가 올바르지 않습니다", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("회원정보를 찾을 수 없습니다", HttpStatus.NOT_FOUND);
        }
    }
    private String generateRandomAuthCode() {
        Random random = new Random();
        return String.format("%04d", random.nextInt(10000));
    }

}




