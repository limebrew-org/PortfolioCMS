package in.limebrew.portfoliocms.controllers.experience.jobs;

import in.limebrew.portfoliocms.entity.Skill;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import in.limebrew.portfoliocms.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        return null;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addJob(@RequestHeader("Authorization") String authHeader,
                                                             @RequestBody Skill skills) {
        return null;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateJobById(@RequestHeader("Authorization") String authHeader,
                                                                    @PathVariable("id") String id,
                                                                    @RequestBody Skill skills) {
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteJobById(@RequestHeader("Authorization") String authHeader,
                                                                    @PathVariable("id") String id) {
        return null;
    }
}
