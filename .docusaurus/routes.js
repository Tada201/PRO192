import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', 'e58'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '2ce'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', '11b'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'f13'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', 'bff'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '830'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '13e'),
    exact: true
  },
  {
    path: '/docs/Home',
    component: ComponentCreator('/docs/Home', 'd7d'),
    exact: true
  },
  {
    path: '/docs/SearchResults',
    component: ComponentCreator('/docs/SearchResults', '40c'),
    exact: true
  },
  {
    path: '/docs/SectionPage',
    component: ComponentCreator('/docs/SectionPage', 'd07'),
    exact: true
  },
  {
    path: '/docs/syllabus-pro192-spring2021',
    component: ComponentCreator('/docs/syllabus-pro192-spring2021', '7c6'),
    exact: true
  },
  {
    path: '/docs/syllabus-tabs',
    component: ComponentCreator('/docs/syllabus-tabs', '18c'),
    exact: true
  },
  {
    path: '/docs/docs',
    component: ComponentCreator('/docs/docs', '94d'),
    routes: [
      {
        path: '/docs/docs',
        component: ComponentCreator('/docs/docs', 'e48'),
        routes: [
          {
            path: '/docs/docs',
            component: ComponentCreator('/docs/docs', '0f9'),
            routes: [
              {
                path: '/docs/docs/example',
                component: ComponentCreator('/docs/docs/example', '633'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/docs/Syllabus_mat/sheet001',
                component: ComponentCreator('/docs/docs/Syllabus_mat/sheet001', 'ee1'),
                exact: true
              },
              {
                path: '/docs/docs/Syllabus_mat/sheet002',
                component: ComponentCreator('/docs/docs/Syllabus_mat/sheet002', '95f'),
                exact: true
              },
              {
                path: '/docs/docs/Syllabus_mat/sheet003',
                component: ComponentCreator('/docs/docs/Syllabus_mat/sheet003', '38b'),
                exact: true
              },
              {
                path: '/docs/docs/Syllabus_mat/sheet004',
                component: ComponentCreator('/docs/docs/Syllabus_mat/sheet004', '409'),
                exact: true
              },
              {
                path: '/docs/docs/Syllabus_mat/sheet005',
                component: ComponentCreator('/docs/docs/Syllabus_mat/sheet005', '509'),
                exact: true
              },
              {
                path: '/docs/docs/Syllabus_mat/tabstrip',
                component: ComponentCreator('/docs/docs/Syllabus_mat/tabstrip', '72e'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
