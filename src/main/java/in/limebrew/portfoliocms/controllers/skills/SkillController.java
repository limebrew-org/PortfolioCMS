package in.limebrew.portfoliocms.controllers.skills;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.entity.Experience.Job;
import in.limebrew.portfoliocms.entity.Skill;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.SkillService;
import in.limebrew.portfoliocms.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

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
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Get job by id
            Skill skill = skillService.getSkillById(id);

            //? Check if job exists for the id
            if(skill == null) return ResponseUtil.errorNotFound();

            //? Create response
            Map<String, Object> response = new HashMap<>();
            response.put("skills", skill);

            //? Return response
            return ResponseUtil.successGetOne(response);


        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addSkills(@RequestHeader("Authorization") String authHeader,
                                                         @RequestBody Skill skills) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            skills.setProfileId(decodedToken.getUid());

            //? Save in the database
            skillService.createSkill(skills);

            //? Return response
            return ResponseUtil.successAddOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateSkillById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id,
                                                               @RequestBody Skill skills) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            skills.setProfileId(decodedToken.getUid());

            //? Update the job by id
            skillService.updateSkillById(id,skills);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteSkillById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Delete job by id
            skillService.deleteSkillById(id);

            //? Return response
            return ResponseUtil.successDeleteOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
