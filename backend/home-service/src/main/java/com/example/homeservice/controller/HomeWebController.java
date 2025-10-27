package com.example.homeservice.controller;

import com.example.homeservice.model.DTO.REQ.HomeDTOReq;
import com.example.homeservice.model.DTO.RES.HomeDTORes;
import com.example.homeservice.model.DTO.RES.HomeMemberDTORes;
import com.example.homeservice.service.interf.HomeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/web/homes")
@RequiredArgsConstructor
public class HomeWebController {

    private final HomeService homeService;

    // 🔹 Afficher la liste des maisons
    @GetMapping
    public String listHomes(Model model) {
        // 🔹 Récupère toutes les maisons
        List<HomeDTORes> homes = homeService.getAllHomes();

        // 🔹 Pour chaque maison, on garde uniquement le premier membre s’il y en a plusieurs
        homes.forEach(home -> {
            List<HomeMemberDTORes> members = home.getHomeMember();

            if (members != null && !members.isEmpty()) {
                // ⚡ Garde uniquement le premier HomeMember
                home.setHomeMember(List.of(members.get(0)));
            } else {
                home.setHomeMember(null);
            }
        });

        model.addAttribute("homes", homes);
        return "home-list";
    }


    // 🔹 Afficher le formulaire d’ajout
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("home", new HomeDTOReq());
        return "home-form";
    }

    // 🔹 Traiter la soumission du formulaire
    @PostMapping("/add")
    public String addHome(@Valid @ModelAttribute("home") HomeDTOReq homeDTOReq,
                          BindingResult result,
                          Model model) {
        if (result.hasErrors()) {
            return "home-form"; // rester sur le formulaire si erreurs
        }
        homeService.createHome(homeDTOReq);
        return "redirect:http://localhost:9000/web/homes";
    }

    // 🔹 Supprimer une maison
    @GetMapping("/delete/{id}")
    public String deleteHome(@PathVariable Integer id) {
        homeService.deleteHome(id);
        return "redirect:http://localhost:9000/web/homes";
    }
}
