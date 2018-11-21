package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.Etude;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Etude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudeRepository extends JpaRepository<Etude, Long> {

}
