package com.dailycodebuffer.inventory.repository;

import com.dailycodebuffer.inventory.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends JpaRepository<Storage,Long> {
    Storage findByProductId(Long id);
}
