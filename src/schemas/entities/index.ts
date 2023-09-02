export abstract class Entity<Dto> {
  abstract get dto(): Dto;
  abstract get nonPersonalDto(): Dto;
}
