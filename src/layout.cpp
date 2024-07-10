#include "layout.hpp"
#include "style.hpp"
#include "lib/assets.hpp"

const char* fonts_css = "https://fonts.googleapis.com/css?"
  "family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Belgrano";

Feuillet::Feuillet()
{
  name = "feuillet";
  type = Crails::Cms::ComponentLayoutType;
  component_layout_name = "FeuilletLayoutEditor";
  stylesheets.push_back(FeuilletAssets::layout_css);
  stylesheets.push_back(fonts_css);
  editor_stylesheets.push_back(FeuilletAssets::admin_css);
  editor_stylesheets.push_back(fonts_css);
  editor_javascripts.push_back(FeuilletAssets::editor_js);
  variables.push_back(Crails::Cms::LayoutVariable("main-background", "color", "#ffffff"));
  variables.push_back(Crails::Cms::LayoutVariable("primary-background", "color", "#fabb98"));
  variables.push_back(Crails::Cms::LayoutVariable("secondary-background", "color", "#2211f5"));
  variables.push_back(Crails::Cms::LayoutVariable("primary-font-color", "color", "#484849"));
  variables.push_back(Crails::Cms::LayoutVariable("secondary-font-color", "color", "#ffffff"));
  variables.push_back(Crails::Cms::LayoutVariable("secondary-link-color", "color", "#fabb98"));
  variables.push_back(Crails::Cms::LayoutVariable("feuillet-background", "color", "#fcd9c6"));
}

const Crails::Cms::Style& Feuillet::get_style() const
{
  static const FeuilletStyle style;
  return style;
}
