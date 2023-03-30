package in.limebrew.portfoliocms.entity.Experience;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Internship {
    @DocumentId
    public String id;

    public String profileId;

    public String company;

    public String role;

    public List<String> technologies;

    public String summary;

    public String tenure;
}
