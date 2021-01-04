package com.jotdown.spring.datajpa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name= "subscriptions")
public class Subscription {

@Id
@GeneratedValue(strategy= GenerationType.AUTO)

private long id;

@Column(name= "title")
private String title;

@Column(name="Amount")
private String amount;

@Column(name= "password")
private String password;

@Column(name="date")
private String date;

@Column(name= "published")
private boolean published;



public Subscription(String title, String amount, String password, String date, boolean published) {
	this.title=title;
	this.amount=amount;
	this.password=password;
	this.date=date;
	this.published=published;
}
public long getId() {
	return id;
}

public String getTitle() {
	return title;
}

public void setTitle(String title) {
	this.title = title;
}

public String getDate() {
	return title;
}

public void setDate(String date) {
	this.date = date;
}

public String getAmount() {
	return amount;
}

public void setAmount(String amount) {
	this.amount = amount;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}

public boolean isPublished() {
	return published;
}

public void setPublished(boolean isPublished) {
	this.published = isPublished;
}
@Override
public String toString(){
	return "Subscriptions{id="+ id+", title=" +title+", amount="+amount+",password=" +password+ ",date="+date+", published="+published+"]";
}
}

