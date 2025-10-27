package com.example.userservice.security;


import com.example.userservice.model.entity.User;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = repo.findUserByEmail(username);
        if (user.isPresent()) {
           // log.info("Found user: {}", user.get());
            return new UtilisateurDetail(user.get());
        }

        //log.warn("User not found: {}", username);
        throw new UsernameNotFoundException("User ne trouve pas : " + username);

    }
}
