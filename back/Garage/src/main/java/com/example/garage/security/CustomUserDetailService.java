package com.example.garage.security;

import com.example.garage.model.entity.User;
import com.example.garage.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepo repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = repo.findUserByEmail(username);
        if (user.isPresent()) {
            log.info("Found user: {}", user.get());
            return new UtulisateurDetail(user.get());
        }

        log.warn("User not found: {}", username);
        throw new UsernameNotFoundException("User ne trouve pas : " + username);

    }
}
