package com.hollykunge.service;

import com.hollykunge.model.Vote;
import com.hollykunge.model.VoteItem;

import java.util.List;
import java.util.Optional;

/**
 * @author: zhhongyu
 * @description:
 * @since: Create in 10:54 2019/10/9
 */
public interface VoteItemService {
    /**
     * 新增一个被投票项
     * @param voteItem
     */
    void add(VoteItem voteItem) throws Exception;

    /**
     * 通过vote查询voteitem
     * @param vote
     */
    Optional<List<VoteItem>> findByVoteId(Vote vote);
}