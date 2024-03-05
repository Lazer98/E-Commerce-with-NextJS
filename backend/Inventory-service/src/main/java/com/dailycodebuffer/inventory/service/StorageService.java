package com.dailycodebuffer.inventory.service;

import com.dailycodebuffer.inventory.entity.Storage;
import com.dailycodebuffer.inventory.model.StorageModel;

import java.util.List;

public interface StorageService {
     Storage updateStorage(Long id, StorageModel storageModel);

    List<Storage> getAllStorages();

    Storage getStorageByProductID(Long id);


    Storage saveStorage(StorageModel storageModel);


    String deleteStorage(Long id);
}
