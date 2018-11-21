package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.CommentaireRequette;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CommentaireRequette entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentaireRequetteRepository extends JpaRepository<CommentaireRequette, Long> {

}
