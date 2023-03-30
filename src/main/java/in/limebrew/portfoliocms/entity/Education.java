package in.limebrew.portfoliocms.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Education {

    @DocumentId
    public String id;

    public String profileId;

    public String qualification;

    public String institution;

    public String grade;

    public String tenure;
}
