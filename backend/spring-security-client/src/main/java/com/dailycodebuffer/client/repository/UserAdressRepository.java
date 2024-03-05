package com.dailycodebuffer.client.repository;

import com.dailycodebuffer.client.entity.UserAdress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAdressRepository extends JpaRepository<UserAdress,Long> {
    Optional <UserAdress> findByUserId(Long id);
}
