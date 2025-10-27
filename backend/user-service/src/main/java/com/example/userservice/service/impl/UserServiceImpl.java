package com.example.userservice.service.impl;

import com.example.userservice.exception.UserException;
import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.model.entity.User;

import com.example.userservice.model.enumeration.Role;
import com.example.userservice.model.mapper.UserMapper;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.interf.UserService;
import com.example.userservice.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    // --- Mettre à jour le profil d'un utilisateur ---
    @Override
    public AuthResDTO updateProfile(Integer id, ProfileReqDTO req) {
        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Utilisateur non trouvé avec l'id " + id));

        // Appliquer les champs non nuls (via mapper)
        userMapper.updateUserFromProfileRequest(req, existingUser);

        // Sauvegarder l'utilisateur mis à jour
        User updatedUser = userRepo.save(existingUser);

        // Générer un nouveau token (utile si email ou info sensible a changé)
        String newToken = jwtUtil.generateToken(updatedUser.getEmail());

        // Retourner la réponse
        AuthResDTO response = userMapper.userToAuthResponse(updatedUser);
        response.setToken(newToken);

        return response;
    }

    // --- Lister tous les utilisateurs ---
    @Override
    public List<ProfileResDTO> findAll() {
        List<User> users = userRepo.findAll();
        return userMapper.usersToProfileResponses(users);
    }

//    @Override
//    public List<ProfileResDTO> findByIdHome(Integer id) {
//        List<User> users = userRepo.findUserByIdHome(id);
//        return userMapper.usersToProfileResponses(users);    }

    // --- Chercher un utilisateur par ID ---
    @Override
    public Optional<ProfileResDTO> findById(Integer id) {
        return userRepo.findById(id)
                .map(userMapper::userToProfileResponse);
    }

    // --- Chercher un utilisateur par email ---
    @Override
    public Optional<ProfileResDTO> findByEmail(String email) {
        return userRepo.findUserByEmail(email)
                .map(userMapper::userToProfileResponse);
    }

    // --- Chercher un utilisateur par téléphone ---
    @Override
    public Optional<ProfileResDTO> findByTel(String tel) {
        return userRepo.findUserByTel(tel)
                .map(userMapper::userToProfileResponse);
    }

    // --- Supprimer un utilisateur par ID ---
    @Override
    public boolean deleteById(Integer id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // --- Mise à jour profil ---
    @Override
    public ProfileResDTO updateProfile(String email, ProfileReqDTO request) {
        User user = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        if (request.getNom() != null) user.setNom(request.getNom());
        if (request.getPrenom() != null) user.setPrenom(request.getPrenom());
        if (request.getTel() != null) user.setTel(request.getTel());
        if (request.getDateNaissance() != null) user.setDateNaissance(request.getDateNaissance());



        userRepo.save(user);

        ProfileResDTO response = new ProfileResDTO();
        response.setNom(user.getNom());
        response.setPrenom(user.getPrenom());
        response.setEmail(user.getEmail());
        response.setTel(user.getTel());

        return response;
    }

    public ProfileResDTO updateUserRole(Integer id, Role newRole) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserException("User not found"));
        user.setRole(newRole);
        userRepo.save(user);
        return userMapper.userToProfileResponse(user);
    }



}
