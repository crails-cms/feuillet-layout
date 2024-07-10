#include "style.hpp"
#include <crails/html_template.hpp>
#include <sstream>

using namespace std;
using namespace Crails;

static string render_menu_item(Data item)
{
  return HtmlTemplate::tag("li", {{"class", "u-nav-item"}}, [&]() -> string
  {
    return HtmlTemplate::tag("a", {
      {"href", item["href"].as<string>()},
      {"class", "u-button-style u-nav-link"},
      {"target", item["target"].as<string>()}
    }, [item]() -> string { return item["text"]; });
  });
}

static string render_menu_list(const Cms::Menu& menu)
{
  Data data = menu.get_data();
  auto yield = [&]() -> string
  {
    stringstream html;

    data.each([&](Data item) -> bool
    {
      html << render_menu_item(item);
      return true;
    });
    return html.str();
  };

  return HtmlTemplate::tag("ul", {
    {"class", "u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"}
  }, yield);
}

static const std::string_view menu_collapse_icon_svg = 
  "<a class=\"u-button-style u-nav-link\" href=\"#\">"
  "<svg class=\"u-svg-link\" preserveAspectRatio=\"xMidYMin slice\" viewBox=\"0 0 384.97 384.97\">"
  "<use href=\"#svg-e855\"></use></svg>"
  "<svg xmlns=\"http://www.w3.org/2000/svg\" xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"svg-e855\" x=\"0px\" y=\"0px\" viewBox=\"0 0 384.97 384.97\" style=\"enable-background:new 0 0 384.97 384.97;\" space=\"preserve\" class=\"u-svg-content\"><g><g id=\"Menu\"><path d=\"M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03    C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z\"></path><path d=\"M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03    S379.58,180.455,372.939,180.455z\"></path><path d=\"M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909    c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z\"></path>"
"</g><g></g><g></g><g></g><g></g><g></g><g></g>"
"</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>"
  "</a>";
  
string FeuilletStyle::render_menu(const Cms::Menu& menu, Cms::Menu::Direction direction, const Cms::ClassList& classlist, const string& header) const
{
  return HtmlTemplate::tag("nav", {{"class", "u-menu u-menu-dropdown u-offcanvas u-menu-1 u-enable-responsive"}}, [&]() -> std::string
  {
    stringstream html;

    html << HtmlTemplate::tag("div", {{"class", "menu-collapse"}}, [&]() -> std::string
    {
      return string(menu_collapse_icon_svg);
    });
    html << HtmlTemplate::tag("div", {{"class", "u-nav-container"}}, [&]() -> std::string
    {
      return render_menu_list(menu);
    });
    html << HtmlTemplate::tag("div", {{"class", "u-nav-container-collapse"}}, [&]() -> std::string
    {
      return HtmlTemplate::tag("div", {{"class", "u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav"}}, [&]() -> string
      {
        stringstream html;

        html << HtmlTemplate::tag("div", {{"class", "u-menu-close"}});
        if (header.length() > 0)
          html << "<div class=\"u-menu-header\">" << header << "</div>";
        html << render_menu_list(menu);
        return html.str();
      }) + HtmlTemplate::tag("div", {{"class", "u-black u-menu-overlay u-opacity u-opacity-70"}});
    });
    return html.str();
  });
}

static const vector<string> class_sequence = {"feuillet", "feuillet partial-size", "", "feuillet right-handed", "feuillet right-handed", "feuillet right-handed partial-size", "", "feuillet"};

string FeuilletStyle::feuillet(int index) const
{
  return HtmlTemplate::tag("div", {
    {"class", class_sequence[index % class_sequence.size()]}
  });
}

static map<string,string> attributes_with_class(map<string,string> attrs, string classnames)
{
  if (attrs.count("class"))
    classnames += ' ' + attrs.at("class");
  attrs.insert_or_assign("class", classnames);
  return attrs;
}

string FeuilletStyle::card(const map<string,string>& attrs, function<string()> yield) const
{
  return HtmlTemplate::tag("div", attributes_with_class(attrs, "u-card"), yield);
}

string FeuilletStyle::section(int index, const map<string,string>& attrs, function<string()> yield) const
{
  stringstream html;
  map<string,string> section_attrs = attributes_with_class(attrs, "u-clearfix");

  html << HtmlTemplate::tag("section", section_attrs, [&]() -> string
  {
    return feuillet(index) +
      HtmlTemplate::tag("div", {
        {"class", "u-clearfix u-sheet u-sheet-1"}
      }, [&]() -> string
      {
        return HtmlTemplate::tag("div", {
          {"class", "u-clearfix u-layout-wrap u-layout-wrap-1"}
        }, yield);
      });
  });
  return html.str();
}

string FeuilletStyle::breadcrumbs(const Cms::BreadcrumbsList& crumbs) const
{
  return HtmlTemplate::tag("nav", {{"class", "breadcrumbs"}}, [&]()
  {
    return HtmlTemplate::tag("ul", [&]()
    {
      string html;

      for (const auto& crumb : crumbs)
      {
        html += HtmlTemplate::tag("li", [&]()
        {
          return HtmlTemplate::tag("a", {{"href",crumb.first}}, [crumb]()
          {
            return crumb.second;
          });
        });
      }
      return html;
    });
  });
}
