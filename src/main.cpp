#include "layout.hpp"
#include "lib/assets.hpp"
#include "lib/renderers/feuillet_html_renderer.hpp"

extern "C"
{
  Crails::BuiltinAssets* get_assets()
  {
    static FeuilletAssets assets;
    return &assets;
  }

  Crails::Renderer* get_html_renderer()
  {
    static FeuilletHtmlRenderer renderer;
    return &renderer;
  }

  Crails::Cms::Layout* create_layout()
  {
    return new Feuillet();
  }
}
