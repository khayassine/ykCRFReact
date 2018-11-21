package ma.yk.cro.crf.repository;

import ma.yk.cro.crf.domain.SousRegion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SousRegion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SousRegionRepository extends JpaRepository<SousRegion, Long> {

}
