export type Content = {
  id: string;
  kind: 'project' | 'article';
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  alt: string;
  status: 'draft' | 'published';
  body: { heading: string; text: string }[];
  updated_at: string;
};
export const photos = {
  courtyard: 'https://images.unsplash.com/photo-1758452444410-384567880c7c',
  timber: 'https://images.unsplash.com/photo-1766802981813-e532002dfc22',
  lobby: 'https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9',
};
export const seedContent: Content[] = [
  {
    id: 'p1',
    kind: 'project',
    slug: 'the-courtyard-house',
    title: 'The Courtyard House',
    category: 'Residential architecture',
    summary: 'An inward-looking home. An open conversation with light.',
    image: photos.courtyard,
    alt: 'Concrete courtyard framed by quiet architectural planes and daylight',
    status: 'published',
    updated_at: '2026-09-01',
    body: [
      {
        heading: 'Context',
        text: 'A concept for a compact urban home where privacy and access to daylight need to coexist. The courtyard becomes the starting point rather than the space left over.',
      },
      {
        heading: 'Challenge',
        text: 'A deep plan can disconnect the rooms we use most from the outdoors. The study asks how a home can feel open without exposing daily life to the street.',
      },
      {
        heading: 'Design response',
        text: 'Arrange shared rooms around a protected void. A continuous threshold connects cooking, eating and sitting, while quieter spaces occupy the outer edges.',
      },
      {
        heading: 'Spatial approach',
        text: 'Use a restrained material palette, deep reveals and carefully placed openings to give changing daylight a visible presence. Test sightlines at seated height as well as standing height.',
      },
      {
        heading: 'Intended experience',
        text: 'A home that offers both retreat and connection: a place to notice the weather, move easily between activities and find a quiet corner.',
      },
    ],
  },
  {
    id: 'p2',
    kind: 'project',
    slug: 'a-room-in-timber',
    title: 'A Room in Timber',
    category: 'Interior design',
    summary: 'Warm material. Clear geometry. Room to slow down.',
    image: photos.timber,
    alt: 'Light timber interior with exposed structure and minimal furnishings',
    status: 'published',
    updated_at: '2026-08-28',
    body: [
      {
        heading: 'Context',
        text: 'A concept interior exploring how a single material family can bring coherence to an open room.',
      },
      {
        heading: 'Challenge',
        text: 'Open plans often need distinct places for work, rest and gathering without the rigidity of more walls.',
      },
      {
        heading: 'Design response',
        text: 'Use joinery as a spatial tool. Low storage, framed openings and a shared material datum define zones while preserving a continuous view.',
      },
      {
        heading: 'Spatial approach',
        text: 'Balance the tactile grain of timber with cool, quiet surfaces. Keep circulation clear and place storage at the points where daily routines begin.',
      },
      {
        heading: 'Intended experience',
        text: 'A generous room with a readable order, where practical things have a place and the space can adapt over time.',
      },
    ],
  },
  {
    id: 'p3',
    kind: 'project',
    slug: 'the-common-ground',
    title: 'The Common Ground',
    category: 'Commercial interiors',
    summary: 'A softer threshold between the street and the working day.',
    image: photos.lobby,
    alt: 'Contemporary lobby with natural light and architectural circulation',
    status: 'published',
    updated_at: '2026-08-20',
    body: [
      {
        heading: 'Context',
        text: 'A small workplace concept centred on its shared arrival space.',
      },
      {
        heading: 'Challenge',
        text: 'Reception can become a barrier between visitors and the people they have come to meet.',
      },
      {
        heading: 'Design response',
        text: 'Replace the dominant desk with a sequence of welcoming places: an obvious arrival point, a seat with a view and a clear path onward.',
      },
      {
        heading: 'Spatial approach',
        text: 'Test acoustic separation, accessible circulation and the relationship between shared and focused work. Material changes signal transitions without visual clutter.',
      },
      {
        heading: 'Intended experience',
        text: 'An arrival that feels intuitive and a shared space that supports brief conversations as comfortably as a quiet pause.',
      },
    ],
  },
  {
    id: 'a1',
    kind: 'article',
    slug: 'light-is-a-building-material',
    title: 'Light is a building material.',
    category: 'Spatial thinking',
    summary:
      'Before choosing a finish, understand what the light is already doing.',
    image: photos.courtyard,
    alt: 'Daylight moving across concrete courtyard surfaces',
    status: 'published',
    updated_at: '2026-09-01',
    body: [
      {
        heading: 'Begin with observation',
        text: 'Daylight changes the way a room is understood. Before selecting materials, observe where light enters, how far it travels and what interrupts it. A plan drawn without that information is missing one of its most useful dimensions.',
      },
      {
        heading: 'Design the edge',
        text: 'The depth of a window reveal can matter as much as the size of the opening. A deep edge softens the transition between brightness and shade. A high opening may bring light further into a room while maintaining privacy.',
      },
      {
        heading: 'Test through the day',
        text: 'A single compelling view does not explain how a space will feel from morning to evening. Test several moments and seasons. Consider glare at a desk, the view from a chair and the shadows falling across a route.',
      },
      {
        heading: 'Let materials respond',
        text: 'Choose materials alongside the available light. A textured surface can reveal small changes; a reflective finish can create unwanted glare. The aim is a considered relationship between opening, surface and everyday use.',
      },
    ],
  },
  {
    id: 'a2',
    kind: 'article',
    slug: 'fewer-materials-more-intention',
    title: 'Fewer materials. More intention.',
    category: 'Material notes',
    summary: 'A restrained palette can make space for the details that matter.',
    image: photos.timber,
    alt: 'Timber structure expressing a consistent material palette',
    status: 'published',
    updated_at: '2026-08-24',
    body: [
      {
        heading: 'Start with what a material does',
        text: 'Timber, concrete and plaster have different behaviours as well as different appearances. Consider touch, maintenance, acoustics and repair before deciding how they look together.',
      },
      {
        heading: 'Make the junction count',
        text: 'A small palette makes junctions more visible. Study where one surface meets another, how an edge turns and where a fixing can remain accessible. These are practical decisions with a strong spatial effect.',
      },
      {
        heading: 'Allow for time',
        text: 'A finish should be considered in use. Ask how it will wear, whether a local repair is possible and what cleaning it needs. Material direction is also a conversation about care.',
      },
    ],
  },
];
