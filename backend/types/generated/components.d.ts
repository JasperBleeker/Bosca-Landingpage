import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentSection extends Schema.Component {
  collectionName: 'components_component_sections';
  info: {
    displayName: 'Section with Single Image';
    icon: 'layout';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    Link: Attribute.Component<'component.link-button', true>;
    Position: Attribute.Enumeration<['Left', 'Top', 'Right']> &
      Attribute.Required &
      Attribute.DefaultTo<'Left'>;
  };
}

export interface ComponentSectionWithGallery extends Schema.Component {
  collectionName: 'components_component_section_with_galleries';
  info: {
    displayName: 'Section with Gallery';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    Gallery: Attribute.Media<'images', true> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    Description: Attribute.Text;
    Link: Attribute.Component<'component.link-button'>;
  };
}

export interface ComponentLinkButton extends Schema.Component {
  collectionName: 'components_component_link_buttons';
  info: {
    displayName: 'Link Button';
    icon: 'attachment';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
  };
}

export interface BaseComponentPageBase extends Schema.Component {
  collectionName: 'components_base_component_page_bases';
  info: {
    displayName: 'Page Base';
    icon: 'code';
    description: '';
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    heroimage: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface NavigationNavigation extends Schema.Component {
  collectionName: 'components_navigation_navigations';
  info: {
    displayName: 'Navigation';
    icon: 'link';
    description: '';
  };
  attributes: {
    link: Attribute.String & Attribute.Required & Attribute.DefaultTo<'/about'>;
    menu: Attribute.Boolean & Attribute.DefaultTo<true>;
    footer: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'component.section': ComponentSection;
      'component.section-with-gallery': ComponentSectionWithGallery;
      'component.link-button': ComponentLinkButton;
      'base-component.page-base': BaseComponentPageBase;
      'navigation.navigation': NavigationNavigation;
    }
  }
}
