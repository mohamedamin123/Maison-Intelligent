package com.example.house.service.impl;

import com.example.house.model.DTO.req.UserReqDTO;
import com.example.house.model.DTO.res.UserResDTO;
import com.example.house.model.entity.User;
import com.example.house.model.mapper.UserMapper;
import com.example.house.repository.UserRepo;
import com.example.house.security.UtilisateurDetail;
import com.example.house.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo repository;
    private final UserMapper mapper;
    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @Override
    public UserResDTO save(UserReqDTO req) {
        User emp = mapper.toEntity(req);
        emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        repository.save(emp);
        return mapper.toResDTO(emp);
    }

    @Override
    public UserResDTO update(Integer id, UserReqDTO req) {
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
        if (req.getPrenom() != null) existingUser.setPrenom(req.getPrenom());
        if (req.getNom() != null) existingUser.setNom(req.getNom());
        if (req.getEmail() != null) existingUser.setEmail(req.getEmail());
        if (req.getTel() != null) existingUser.setTel(req.getTel());
        if (req.getStatut() != null) existingUser.setStatut(req.getStatut());
        if (req.getDateNaissance() != null) existingUser.setDateNaissance(req.getDateNaissance());
        if (req.getPassword() != null) existingUser.setPassword(req.getPassword());
        if (req.getRole() != null) existingUser.setRole(req.getRole());
        if(req.getPassword()!=null)existingUser.setPassword(this.passwordEncoder.encode(req.getPassword()));
        User updatedUser = repository.save(existingUser);

        return mapper.toResDTO(updatedUser);
    }





    @Override
    public List<UserResDTO> findAll() {
        List<User> users = this.repository.findAll();
        return mapper.toAllResDTO(users);
    }

    @Override
    public Optional<UserResDTO> findById(Integer id) {
        Optional<User> optional = this.repository.findById(id);
        if (optional.isPresent()) {
            UserResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<UserResDTO> findByEmail(String email) {
        Optional<User> optional = this.repository.findUserByEmail(email);
        if (optional.isPresent()) {
            UserResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<UserResDTO> findByTel(String tel) {
        Optional<User> optional = this.repository.findUserByTel(tel);
        if (optional.isPresent()) {
            UserResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public boolean delete(UserReqDTO req) {
        Integer id = req.getIdUser(); // Si disponible
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteById(Integer id) {
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return true;
        }
        return false;
    }



    //-----------------------------------------------------------------------------------------------------------implements
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        // Use Optional's orElseThrow to handle the case where no value is present

        User user = this.repository.findUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + username));

        return new UtilisateurDetail(user);
    }


}
