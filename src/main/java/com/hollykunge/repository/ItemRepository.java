package com.hollykunge.repository;

import com.hollykunge.model.Item;
import com.hollykunge.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findById(Long id);
    List<Item> findItemsByVote(Vote vote);
}
