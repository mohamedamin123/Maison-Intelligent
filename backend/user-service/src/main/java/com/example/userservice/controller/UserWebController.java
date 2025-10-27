package com.example.userservice.controller;

import com.example.userservice.model.DTO.request.RegisterReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.service.interf.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/web/users")
@RequiredArgsConstructor
public class UserWebController {

    private final AuthService userService;
    private final RestTemplate restTemplate; // à déclarer comme @Bean dans une classe @Configuration

    // ✅ Affichage du formulaire
    @GetMapping("/add")
    public String showAddForm(@RequestParam("homeId") Integer homeId, Model model) {
        model.addAttribute("user", new RegisterReqDTO());
        model.addAttribute("homeId", homeId);
        return "user-form";
    }

    // ✅ Soumission du formulaire
    @PostMapping("/add")
    public String addUser(@Valid @ModelAttribute("user") RegisterReqDTO userDTO,
                          BindingResult result,
                          @RequestParam("homeId") Integer homeId,
                          Model model) {

        System.out.println("📌 homeId reçu = " + homeId); // Debug

        if (result.hasErrors()) {
            model.addAttribute("homeId", homeId);
            return "user-form";
        }

        if (homeId == null) {
            model.addAttribute("error", "L'ID de la maison est manquant !");
            model.addAttribute("homeId", homeId);
            return "user-form";
        }

        // 1️⃣ Créer l'utilisateur dans le user-service
        AuthResDTO createdUser = userService.save(userDTO);

        // 2️⃣ Ajouter l’utilisateur à la maison dans home-service
        String url = "http://localhost:9000/homes_members";
        Map<String, Object> body = new HashMap<>();
        body.put("userId", createdUser.getIdUser());
        body.put("homeId", homeId);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, body, String.class);
            System.out.println("✅ Réponse du home-service : " + response.getStatusCode());
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Utilisateur créé mais impossible de l’ajouter à la maison !");
            model.addAttribute("homeId", homeId);
            return "user-form";
        }

        // 3️⃣ Redirection après succès
        return "redirect:http://localhost:9000/web/homes";

    }
}
