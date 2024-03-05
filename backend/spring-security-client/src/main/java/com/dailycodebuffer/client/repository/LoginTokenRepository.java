package com.dailycodebuffer.client.repository;

import com.dailycodebuffer.client.entity.LoginToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginTokenRepository extends
       JpaRepository<LoginToken,Long>

    {
        LoginToken findByToken(String token);
    }

