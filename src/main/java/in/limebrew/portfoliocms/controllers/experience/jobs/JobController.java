package in.limebrew.portfoliocms.controllers.experience.jobs;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.entity.Experience.Internship;
import in.limebrew.portfoliocms.entity.Experience.Job;
import in.limebrew.portfoliocms.entity.Skill;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.JobService;
import in.limebrew.portfoliocms.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "/api/jobs")
@CrossOrigin
public class JobController {

    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    JobService jobService;

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllJobs(@RequestParam(value = "id") String profileId) {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getJobById(@RequestHeader("Authorization") String authHeader,
                                                                 @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Get job by id
            Job job = jobService.getJobById(id);

            //? Check if job exists for the id
            if(job == null) return ResponseUtil.errorNotFound();

            //? Create response
            Map<String, Object> response = new HashMap<>();
            response.put("job", job);

            //? Return response
            return ResponseUtil.successGetOne(response);


        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addJob(@RequestHeader("Authorization") String authHeader,
                                                             @RequestBody Job job) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            job.setProfileId(decodedToken.getUid());

            //? Save in the database
            jobService.createJob(job);

            //? Return response
            return ResponseUtil.successAddOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateJobById(@RequestHeader("Authorization") String authHeader,
                                                                    @PathVariable("id") String id,
                                                                    @RequestBody Job job) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            job.setProfileId(decodedToken.getUid());

            //? Update the job by id
            jobService.updateJobById(id, job);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteJobById(@RequestHeader("Authorization") String authHeader,
                                                                    @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Delete job by id
            jobService.deleteJobById(id);

            //? Return response
            return ResponseUtil.successDeleteOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
