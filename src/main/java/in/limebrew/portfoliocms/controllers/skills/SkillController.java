package in.limebrew.portfoliocms.controllers.skills;

import in.limebrew.portfoliocms.entity.Skill;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/skills")
@CrossOrigin
public class SkillController {
    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    SkillService skillService;

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllSkills(@RequestParam(value = "id") String profileId) {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getSkillById(@RequestHeader("Authorization") String authHeader,
                                                            @PathVariable("id") String id) {
        return null;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addSkills(@RequestHeader("Authorization") String authHeader,
                                                         @RequestBody Skill skills) {
        return null;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateSkillById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id,
                                                               @RequestBody Skill skills) {
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteSkillById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id) {
        return null;
    }
}
