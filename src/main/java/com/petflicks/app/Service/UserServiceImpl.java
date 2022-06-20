package com.petflicks.app.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.petflicks.app.Exception.InvalidLoginException;
import com.petflicks.app.Exception.UserNotFoundException;
import com.petflicks.app.Exception.UsernameAlreadyExists;
import com.petflicks.app.Models.User;
import com.petflicks.app.Repository.UserRepository;


@Service
@Transactional
public class UserServiceImpl implements UserService{

	
	private UserRepository userRepo;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	
	@Override
	public User login(String username, String password) throws UserNotFoundException, InvalidLoginException {

		User userFromDatabase = userRepo.findByUsername(username);
		if (userFromDatabase != null && userFromDatabase.getPassword().equals(password)) 
		{
			return userFromDatabase;
		} else if (userFromDatabase == null ) {
			throw new UserNotFoundException();	
		} else {
			throw new InvalidLoginException();
		}
	}

	@Override
	@Transactional(propagation=Propagation.SUPPORTS)
	public User register(User newUser) throws UsernameAlreadyExists {//
		try
		{
				newUser = ((CrudRepository<User, Integer>) userRepo).save(newUser);
				return newUser;
		}catch (Exception e) {
			throw new UsernameAlreadyExists();
		}
		
	}

	@Override
	@Transactional
	@Cacheable(cacheNames="users",key="#userId")
	public User getUserById(int userId) throws UserNotFoundException {/// working
		return userRepo.findById(userId).get();
	}

	@Override
	@Cacheable(cacheNames="users",key="#email")
	public User getUserByEmail(String email) throws UserNotFoundException {//working
		return userRepo.findByEmail(email);
		
	}

	@Override
	@Cacheable(cacheNames="users",key="#username")
	public User getUserByUsername(String username) throws UserNotFoundException {//
		User user = userRepo.findByUsername(username.toLowerCase().replace(" ", ""));
		return user;
	}

	@Override
	@CachePut(cacheNames = "users", key = "#user.userId")
	public User update(User user) throws UserNotFoundException {//
		if (userRepo.existsById(user.getUserId())) {
			userRepo.save(user);
			user = userRepo.findById(user.getUserId()).get();
			return user;
		}
		return null;
	}

	@Override
	@CacheEvict(cacheNames = "users", key = "#userId")
	public User deleteUser(User user) throws UserNotFoundException {//
		User userFromDatabase = userRepo.findById(user.getUserId()).get();
		if(userFromDatabase != null) {
			userRepo.delete(userFromDatabase);
		}
		return userFromDatabase;
	}

}
