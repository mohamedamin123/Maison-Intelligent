package com.example.garage.security;

import com.example.garage.model.entity.User;
import com.example.garage.model.enumm.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UtulisateurDetail implements UserDetails {

    private final User user;

    public UtulisateurDetail(User user) {

        this.user=user;
    }

    private Role getRole() {
        if (user != null) {
            return user.getRole();
        }
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        Role roleEnum = getRole();
        if (roleEnum != null) {
            String role = "ROLE_" + roleEnum.name();
            GrantedAuthority authority = new SimpleGrantedAuthority(role);
            authorities.add(authority);
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        if (user != null) {
            return user.getPassword();
        }
        return null;
    }

    @Override
    public String getUsername() {
        if (user != null) {
            return user.getEmail();
        }
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.getStatut();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
