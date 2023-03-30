package in.limebrew.portfoliocms.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Project {
    @DocumentId
    public String id;

    public String profileId;

    public String name;

    public String description;

    public List<String> technologies;

    public String link;
}
