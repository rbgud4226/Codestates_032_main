package com.pettalk.jwt;

import com.pettalk.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    public final CustomAuthorityUtils authorityUtils;




    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils){
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;

    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            String username = (String) claims.get("username");
            if (username != null) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        } catch (SignatureException se) { // 서명 체크
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) { // 유효기간 체크
            request.setAttribute("exception", ee);
        } catch (Exception e) { //나머지 예외 체크
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    // 특정 요청에 대해 필터를 수행하지 않아야 할 경우 정의하는 역할
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " 접두사 제거
        }
        return null;
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");

    }

    // 헤더에서 JWT토큰을 추출하고, 해당 토큰을 검증하여 클레임 정보를 얻어온다
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // 검증된 클레임 정보를 기반으로 사용자를 인증하고. Spring Security의 보안 컨텍스트에 인증 정보를 설정
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username"); //클레임 정보에서 사용자이름 역할 정보를 추출
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities); // 추출된 정보로 인증객체를 생성
        SecurityContextHolder.getContext().setAuthentication(authentication); // 생성된 객체로 Spring Security의 보안 컨텍스트에 설정

    }
}