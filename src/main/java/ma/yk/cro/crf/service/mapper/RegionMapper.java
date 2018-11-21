package ma.yk.cro.crf.service.mapper;

import ma.yk.cro.crf.domain.*;
import ma.yk.cro.crf.service.dto.RegionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Region and its DTO RegionDTO.
 */
@Mapper(componentModel = "spring", uses = {VilleMapper.class})
public interface RegionMapper extends EntityMapper<RegionDTO, Region> {

    @Mapping(source = "ville.id", target = "villeId")
    RegionDTO toDto(Region region);

    @Mapping(source = "villeId", target = "ville")
    @Mapping(target = "sousRegions", ignore = true)
    Region toEntity(RegionDTO regionDTO);

    default Region fromId(Long id) {
        if (id == null) {
            return null;
        }
        Region region = new Region();
        region.setId(id);
        return region;
    }
}
