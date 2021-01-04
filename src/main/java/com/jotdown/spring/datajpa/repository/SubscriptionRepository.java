package com.jotdown.spring.datajpa.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jotdown.spring.datajpa.model.Subscription;


public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{
	List<Subscription> findByPublished(boolean published);
	List<Subscription>  findByTitleContaining(String title);

}
