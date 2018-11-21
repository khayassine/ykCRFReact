package ma.yk.cro.crf.service.mapper;

import ma.yk.cro.crf.domain.*;
import ma.yk.cro.crf.service.dto.RegleValidationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RegleValidation and its DTO RegleValidationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RegleValidationMapper extends EntityMapper<RegleValidationDTO, RegleValidation> {



    default RegleValidation fromId(Long id) {
        if (id == null) {
            return null;
        }
        RegleValidation regleValidation = new RegleValidation();
        regleValidation.setId(id);
        return regleValidation;
    }
}
