package in.limebrew.portfoliocms.service.impl;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.limebrew.portfoliocms.service.FirebaseAuthService;
import org.springframework.stereotype.Service;

@Service
public class FirebaseAuthServiceImpl implements FirebaseAuthService {

    @Override
    public FirebaseToken verifyToken(String accessToken) throws FirebaseAuthException {
        FirebaseAuth auth = FirebaseAuth.getInstance();
        FirebaseToken decodedToken = auth.verifyIdToken(accessToken);
        return decodedToken;
    }
}
