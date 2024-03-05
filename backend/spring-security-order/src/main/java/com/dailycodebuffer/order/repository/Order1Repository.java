package com.dailycodebuffer.order.repository;

import com.dailycodebuffer.order.entity.Order1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Order1Repository extends JpaRepository<Order1,Long> {
    Optional<List<Order1>> findByCustomerId(Long id);
}
