package com.pettalk.wcboard.specification;

import com.pettalk.wcboard.entity.WcBoard;
import org.springframework.data.jpa.domain.Specification;

public class WcBoardSpecification {
    public static Specification<WcBoard> equalWcTagWithTag(String wcTag) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wcTag"), wcTag);
    }

    public static Specification<WcBoard> equalAnimalTagWithTag(String animalTag) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("animalTag"), animalTag);
    }

    public static Specification<WcBoard> equalAreaTagWithTag(String areaTag) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("areaTag"), areaTag);
    }
}
