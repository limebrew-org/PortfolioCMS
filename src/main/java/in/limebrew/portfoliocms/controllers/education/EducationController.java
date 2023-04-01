package in.limebrew.portfoliocms.controllers.education;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.entity.Education;
import in.limebrew.portfoliocms.service.EducationService;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "/api/education")
@CrossOrigin
public class EducationController {

    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    EducationService educationService;

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String,Object>> getAllEducation(@RequestParam(value = "id") String profileId) {
       return null;
    }

    @GetMapping(value = "/{id}")
    public  ResponseEntity<Map<String, Object>> getEducationById(@RequestHeader("Authorization") String authHeader,
                                                                 @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Get education by id
            Education education = educationService.getEducationById(id);

            //? Check if education exists for the id
            if(education == null) return ResponseUtil.errorNotFound();

            //? Create response
            Map<String, Object> response = new HashMap<>();
            response.put("education", education);

            //? Return response
            return ResponseUtil.successGetOne(response);


        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Map<String, Object>> addEducation(@RequestHeader("Authorization") String authHeader,
                                                            @RequestBody Education education) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            education.setProfileId(decodedToken.getUid());

            //? Save in the database
            educationService.createEducation(education);

            //? Return response
            return ResponseUtil.successAddOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Map<String, Object>> updateEducationById(@RequestHeader("Authorization") String authHeader,
                                                                   @PathVariable("id") String id,
                                                                   @RequestBody Education education) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            education.setProfileId(decodedToken.getUid());

            //? Update the education by id
            educationService.updateEducationById(id, education);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteEducationById(@RequestHeader("Authorization") String authHeader,
                                                                   @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Delete education by id
            educationService.deleteTransactionById(id);

            //? Return response
            return ResponseUtil.successDeleteOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }



}
