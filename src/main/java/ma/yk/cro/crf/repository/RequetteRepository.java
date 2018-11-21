package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.Requette;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Requette entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequetteRepository extends JpaRepository<Requette, Long> {

}
