package in.limebrew.portfoliocms.controllers.experience.internships;

import in.limebrew.portfoliocms.entity.Skill;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/internships")
@CrossOrigin
public class InternshipController {

    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    InternshipService internshipService;

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllInternships(@RequestParam(value = "id") String profileId) {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getInternshipById(@RequestHeader("Authorization") String authHeader,
                                                            @PathVariable("id") String id) {
        return null;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addInternship(@RequestHeader("Authorization") String authHeader,
                                                         @RequestBody Skill skills) {
        return null;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateInternshipById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id,
                                                               @RequestBody Skill skills) {
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteInternshipById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id) {
        return null;
    }
}
