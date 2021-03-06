package com.hollykunge.service.impl;

import com.hollykunge.exception.BaseException;
import com.hollykunge.model.User;
import com.hollykunge.model.Vote;
import com.hollykunge.repository.VoteRepository;
import com.hollykunge.service.VoteService;
import com.hollykunge.util.SystemLoginEnableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class VoteServiceImp implements VoteService {
    @Autowired
    private SystemLoginEnableUtil systemLoginEnableUtil;

    private final VoteRepository voteRepository;

    @Autowired
    public VoteServiceImp(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    @Override
    public Optional<Vote> findForId(Long id) {
        return voteRepository.findById(id);
    }

    @Override
    public Vote save(Vote vote) {
        return voteRepository.saveAndFlush(vote);
    }

    @Override
    public Page<Vote> findByUserOrderedByDatePageable(User user, int page) {
        //不需要登录
        if(!systemLoginEnableUtil.isNeedLogin() && !systemLoginEnableUtil.isIntranet()){
            return voteRepository.findAllByOrderByCreateDateDesc(new PageRequest(subtractPageByOne(page), 5));
        }
        return voteRepository.findByUserOrderByCreateDateDesc(user, new PageRequest(subtractPageByOne(page), 5));
    }

    @Override
    public Page<Vote> findAllOrderedByDatePageable(int page) {
        return voteRepository.findAllByOrderByCreateDateDesc(new PageRequest(subtractPageByOne(page), 5));
    }

    @Override
    public void delete(Vote vote) {
        voteRepository.delete(vote);
    }

    @Override
    public Vote updateById(Vote vote) throws Exception{
        if(StringUtils.isEmpty(vote.getId())){
            throw new BaseException("id不能为空...");
        }
        Optional<Vote> byId = voteRepository.findById(vote.getId());
        if(!byId.isPresent()){
            throw new BaseException("不存在这个vote...");
        }
        Vote votedata = byId.get();
        setVote(vote,votedata);
        voteRepository.saveAndFlush(votedata);
        return votedata;
    }

    private void setVote(Vote source,Vote target){
        if (!StringUtils.isEmpty(source.getBody())){
            target.setBody(source.getBody());
        }
        if (source.getCreateDate() != null){
            target.setCreateDate(source.getCreateDate());
        }
        if (!StringUtils.isEmpty(source.getTitle())){
            target.setTitle(source.getTitle());
        }
        if(!StringUtils.isEmpty(source.getStatus())){
            target.setStatus(source.getStatus());
        }
        if(!StringUtils.isEmpty(source.getExcelHeader())){
            target.setExcelHeader(source.getExcelHeader());
        }
    }

    private int subtractPageByOne(int page){
        return (page < 1) ? 0 : page - 1;
    }
}
