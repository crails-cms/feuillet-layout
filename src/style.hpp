#pragma once
#include <crails/cms/views/style.hpp>

class FeuilletStyle : public Crails::Cms::Style
{
  SINGLETON_IMPLEMENTATION(FeuilletStyle, Crails::Cms::Style)
public:
  std::string feuillet(int index) const;

private:
  Crails::Cms::ClassList menu_heading_classes() const override { return {}; }
  Crails::Cms::ClassList menu_classes() const override { return {"u-align-center", "u-nav", "u-popupmenu-items", "u-unstyled", "u-nav-2"}; }
  Crails::Cms::ClassList menu_link_classes() const override { return {"u-button-style", "u-nav-link"}; }
  Crails::Cms::ClassList menu_item_classes() const override { return {"u-nav-item"}; }

  Crails::Cms::ClassList button_classes() const override { return {"u-button"}; }
  Crails::Cms::ClassList active_button_classes() const override { return button_classes() + "active"; }

  Crails::Cms::ClassList card_classes() const override { return {"u-container-style", "u-palette-2-base", "u-valign-middle-lg", "u-valign-middle-sm", "u-card"}; }
  Crails::Cms::ClassList frame_classes() const override { return {}; }

  Crails::Cms::ClassList paginator_classes() const override { return {"u-paginator"}; }

  std::string render_menu(const Crails::Cms::Menu& menu, Crails::Cms::Menu::Direction direction, const Crails::Cms::ClassList& classlist = {}, const std::string& header = "") const override;
  std::string section(int index, const std::map<std::string,std::string>& attrs, std::function<std::string()> yield) const override;
  std::string card(const std::map<std::string,std::string>& attrs, std::function<std::string()> yield) const override;
  std::string breadcrumbs(const Crails::Cms::BreadcrumbsList&) const override;
};
