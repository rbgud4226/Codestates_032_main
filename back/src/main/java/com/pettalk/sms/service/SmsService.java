package com.pettalk.sms.service;

import com.pettalk.member.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Duration;


@Service
public class SmsService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Transactional
    public void cacheMemberInfo(Member member) {
        redisTemplate.opsForValue().set(member.getEmail(), member, Duration.ofMinutes(10));
    }

}
