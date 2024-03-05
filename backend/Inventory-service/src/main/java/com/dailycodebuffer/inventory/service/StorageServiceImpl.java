package com.dailycodebuffer.inventory.service;

import com.dailycodebuffer.inventory.entity.Storage;
import com.dailycodebuffer.inventory.model.StorageModel;
import com.dailycodebuffer.inventory.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class StorageServiceImpl implements StorageService{

    @Autowired
    StorageRepository storageRepository;


    @Override
    public Storage updateStorage(Long id, StorageModel storageModel) {
        Storage storage  =storageRepository.findByProductId(id);
        if(!Objects.equals(storage.getQuantity(),
                storageModel.getQuantity())){
            storage.setQuantity(storageModel.getQuantity());
        }
        storageRepository.save(storage);
        return storage;
    }

    @Override
    public List<Storage> getAllStorages() {
        return storageRepository.findAll();
    }

    @Override
    public Storage getStorageByProductID(Long id) {
        return storageRepository.findByProductId(id);
    }

    @Override
    public Storage saveStorage(StorageModel storageModel) {
        Storage storage =new Storage();
        storage.setQuantity(storageModel.getQuantity());
        storage.setProductId(storageModel.getProductId());
        storageRepository.save(storage);
        return storage;
    }

    @Override
    public String deleteStorage(Long id) {
        boolean exists= storageRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("Storage doesn't exist");
        }
        storageRepository.deleteById(id);
        return "Deleted successfully!";
    }
}
