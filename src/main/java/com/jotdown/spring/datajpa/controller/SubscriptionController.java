package com.jotdown.spring.datajpa.controller;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jotdown.spring.datajpa.model.Subscription;
import com.jotdown.spring.datajpa.repository.SubscriptionRepository;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")



public class SubscriptionController {
	@Autowired
	SubscriptionRepository subscriptionRepository;

	@GetMapping("/subscriptions")
	public ResponseEntity <List<Subscription>> getAllSubscriptions (@RequestParam(required =false)String title){
		try {
			List<Subscription> subscriptions = new ArrayList<Subscription>();
			
			if(title== null)
				subscriptionRepository.findAll().forEach(subscriptions::add);
			else
			subscriptionRepository.findByTitleContaining(title).forEach(subscriptions::add);
			
			if(subscriptions.isEmpty()) {
				return new ResponseEntity<> (HttpStatus.NO_CONTENT);
			}
		return new ResponseEntity<>(subscriptions, HttpStatus.OK);
	}catch (Exception e) {
		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	}
	@GetMapping("/subscriptions/{id}")
	public ResponseEntity<Subscription> getSubscriptionById(@PathVariable ("id") long id){
		
		Optional<Subscription> subscriptionData = subscriptionRepository.findById(id);
		
		if(subscriptionData.isPresent()) {
			return new ResponseEntity<>(subscriptionData.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		}
	@PostMapping("/subscriptions")
	public ResponseEntity<Subscription> createSubscription (@RequestBody Subscription subscription){
		try {
			Subscription _subscription= subscriptionRepository
					.save(new Subscription(subscription.getTitle(),subscription.getAmount(),subscription.getPassword(),subscription.getDate(), false));
			return new ResponseEntity<>(_subscription, HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity <>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}
	@PutMapping("/subscriptions/{id}")
	public ResponseEntity<Subscription> updateSubscription(@PathVariable("id")long id, @RequestBody Subscription subscription ){
		Optional<Subscription> subscriptionData= subscriptionRepository.findById(id);
		if(subscriptionData.isPresent()) {
			
			Subscription _subscription = subscriptionData.get();
			_subscription.setTitle(subscription.getTitle());
			_subscription.setAmount(subscription.getAmount());
			_subscription.setPassword(subscription.getPassword());
			_subscription.setPassword(subscription.getDate());
			_subscription.setPublished(subscription.isPublished());
			
			return new ResponseEntity<>(subscriptionRepository.save(_subscription), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
		@DeleteMapping("/subscriptions/{id}")
		public ResponseEntity <HttpStatus> deleteSubscription (@PathVariable ("id")long id){
			try {
				subscriptionRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
			@DeleteMapping("/subscriptions")
			public ResponseEntity <HttpStatus> deleteAllSubscriptions(){
				try {
					subscriptionRepository.deleteAll();
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}catch(Exception e) {
					return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
				}
				
			}
			@GetMapping("/subscriptions/published")
			public ResponseEntity <List<Subscription>> findByPublished(){
				try {
					List<Subscription> subscriptions = subscriptionRepository.findByPublished(true);
					if(subscriptions.isEmpty()) {
						return new ResponseEntity<>(HttpStatus.NO_CONTENT);
					}
					return new ResponseEntity <>(subscriptions, HttpStatus.OK);
						
				}catch (Exception e) {
					return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
					
				}
			}
	} 


