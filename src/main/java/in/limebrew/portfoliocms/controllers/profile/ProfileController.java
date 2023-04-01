package in.limebrew.portfoliocms.controllers.profile;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.entity.Profile;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.ProfileService;
import in.limebrew.portfoliocms.service.impl.ProfileServiceImpl;
import in.limebrew.portfoliocms.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "/api/profile")
@CrossOrigin
public class ProfileController {
    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    ProfileService profileService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Map<String, Object>> getProfileById(@PathVariable("id") String profileId) throws FirebaseAuthException {
        try {

            //? Get the profile by profileId
            Profile profile = profileService.getProfileById(profileId);

            //? If profile doesn't exist, return error not found
            if(profile == null) {
                return ResponseUtil.errorNotFound();
            }

            //? Create response
            Map<String, Object> response = new HashMap<>();
            response.put("profile", profile);

            //? Return response
            return ResponseUtil.successGetOne(response);

        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Map<String, Object>> updateProfileById(@RequestHeader("Authorization") String authHeader,
                                                                 @PathVariable("id") String profileId, @RequestBody Profile profile) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Update the profile by profileId
            profileService.updateProfileById(profileId, profile);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }
}
