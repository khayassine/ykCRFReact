package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.TypeComposant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TypeComposant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeComposantRepository extends JpaRepository<TypeComposant, Long> {

}
