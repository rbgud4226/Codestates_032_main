package com.pettalk.oauth.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
@Service
public class KakaoLoginService {
    @Value("${jwt.key}")
    private String jwtSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.client_id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client_secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect_uri}")
    private String redirectUri;

    public String getAccessTokenFromAuthorizationCode(String authorizationCode) {
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizationCode);

        Map<String, Object> response = restTemplate.postForObject("https://kauth.kakao.com/oauth/token", params, Map.class);

        return (String) response.get("access_token");
    }


    public String login(String kakaoAccessToken) {
        Map<String, Object> kakaoProfile =  callKakaoApi(kakaoAccessToken);
        String kakaoId = String.valueOf(kakaoProfile.get("id"));
        long now = System.currentTimeMillis();
        long expiration = now + 3600000;

        String base64EncodedSecretKey = Base64.getEncoder().encodeToString(jwtSecret.getBytes());

        String jwtToken = Jwts.builder()
                .setSubject(kakaoId)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(expiration))
                .signWith(SignatureAlgorithm.HS256, base64EncodedSecretKey)
                .compact();

        return jwtToken;
    }

    public Map<String, Object> getKakaoProfile(String kakaoAccessToken) {
        return callKakaoApi(kakaoAccessToken);
    }

    private Map<String, Object> callKakaoApi(String kakaoAccessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                entity,
                Map.class
        );
        return response.getBody();
    }
}
