package com.dailycodebuffer.inventory.controller;

import com.dailycodebuffer.inventory.entity.Storage;
import com.dailycodebuffer.inventory.model.StorageModel;
import com.dailycodebuffer.inventory.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/storage")
public class StorageController {

    @Autowired
    StorageService storageService;

    @GetMapping()
    public List<Storage> getAllStorages(){
        return storageService.getAllStorages();

    }
    @GetMapping("/{productId}")
    public Storage getStorageByProductId(@PathVariable("productId")Long productId){
        return storageService.getStorageByProductID(productId);
    }



    @PostMapping
    public Storage saveStorage(@RequestBody StorageModel storageModel){
        Storage storage=storageService.getStorageByProductID(storageModel.getProductId());
        if(storage==null){
            storage = storageService.saveStorage(storageModel);
        }else{
            storage =storageService.updateStorage(storage.getId(),storageModel);
        }
        return storage;
    }

    @DeleteMapping(path="{storageId}")
    public void deleteStorage(@PathVariable("storageId")Long id){
        storageService.deleteStorage(id);
    }

    @PutMapping("{storageId}")
    public Storage updateStorage(
            @PathVariable("storageId") Long storageId,
            @RequestBody(required=false) StorageModel storageModel){
        return storageService.updateStorage(storageId,storageModel);

    }
}
