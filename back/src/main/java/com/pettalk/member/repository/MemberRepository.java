package com.pettalk.member.repository;

import com.pettalk.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Member findByMemberId(long memberId);
    boolean existsByEmail(String email);

    Optional<Member> findByEmailOrKakaoId(String email, String kakaoId);

//    Member findNickNameById(Long memberId);
}
