package in.limebrew.portfoliocms.controllers.experience.internships;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.entity.Education;
import in.limebrew.portfoliocms.entity.Experience.Internship;
import in.limebrew.portfoliocms.entity.Skill;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.InternshipService;
import in.limebrew.portfoliocms.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

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
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Get internship by id
            Internship internship = internshipService.getInternshipById(id);

            //? Check if education exists for the id
            if(internship == null) return ResponseUtil.errorNotFound();

            //? Create response
            Map<String, Object> response = new HashMap<>();
            response.put("internship", internship);

            //? Return response
            return ResponseUtil.successGetOne(response);


        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addInternship(@RequestHeader("Authorization") String authHeader,
                                                         @RequestBody Internship internship) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            internship.setProfileId(decodedToken.getUid());

            //? Save in the database
            internshipService.createInternship(internship);

            //? Return response
            return ResponseUtil.successAddOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateInternshipById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id,
                                                               @RequestBody Internship internship) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            internship.setProfileId(decodedToken.getUid());

            //? Update the education by id
            internshipService.updateInternshipById(id, internship);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteInternshipById(@RequestHeader("Authorization") String authHeader,
                                                               @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Delete education by id
            internshipService.deleteInternshipById(id);

            //? Return response
            return ResponseUtil.successDeleteOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
